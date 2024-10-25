using Microsoft.Extensions.Configuration;
using System.Collections;
using System.Text;

namespace Poliza.Infraestructure.Extensions
{
    public static class EnvironmentVariableExtension
    {
        public static string GetFromEnviroment(this IConfiguration configuration, string name)
        {
            var variables = Environment.GetEnvironmentVariables();
            string connectionString = configuration.GetConnectionString(name) ?? string.Empty;
            StringBuilder stringBuilder = new StringBuilder(connectionString);
            foreach (DictionaryEntry variable in variables)
            {
                if (connectionString.Contains(variable.Key.ToString()!))
                {
                    string key = "{{" + variable.Key + "}}";
                    stringBuilder.Replace(key, variable.Value!.ToString());
                }
            }

            return stringBuilder.ToString();
        }
    }
}
