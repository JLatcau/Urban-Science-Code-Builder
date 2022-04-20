using Microsoft.Extensions.Options;

namespace WebAPI.Logging
{
    [ProviderAlias("WebAPIFileLoggerProvider")]
    public class WebAPIFileLoggerProvider: ILoggerProvider
    {
        public readonly WebAPIFileLoggerOptions Options;
        public WebAPIFileLoggerProvider(IOptions<WebAPIFileLoggerOptions> _options) { 
            Options= _options.Value;
            if (!Directory.Exists(Options.FolderPath))
            { 
                Directory.CreateDirectory(Options.FolderPath!);
            }

        }

        public ILogger CreateLogger(string categoryName)
        {
            return new WebAPIFileLogger(this);
        }

        public void Dispose()
        {
        }
    }
}
