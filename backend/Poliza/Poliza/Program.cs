using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Poliza.API.Services;
using Poliza.API.Services.Interfaces;
using Poliza.Core.Enumerations;
using Poliza.Infraestructure.Contexts;
using Poliza.Infraestructure.Extensions;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

Console.WriteLine(builder.Configuration.GetFromEnviroment("SocialMedia"));
builder.Services.AddDbContext<PolizaContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetFromEnviroment("SeguroContinentalTestCoding"));
});

builder.Services.AddUnitOfWorkBuilder((configuration, provider) =>
{
    configuration.RegisterUnitOfWork(UnitOfWorkType.SeguroContinentalTestCoding, () => provider.GetRequiredService<PolizaContext>());
});

builder.Services.AddTransient<ITipoPersonaService, TipoPersonaService>();
builder.Services.AddTransient<IClienteService, ClienteService>();
builder.Services.AddTransient<IPolizaService, PolizaService>();
var mapsConfig = new MapperConfiguration(configs =>
{
    var profiles = Assembly.GetExecutingAssembly()
                           .GetTypes()
                           .Where(x => typeof(Profile).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface)
                           .ToList();

    profiles.ForEach(profile => configs.AddProfile(Activator.CreateInstance(profile) as Profile));
});

IMapper mapper = mapsConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowOriginPolizaApi",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors("AllowOriginPolizaApi");

app.MapControllers();

app.Run();
