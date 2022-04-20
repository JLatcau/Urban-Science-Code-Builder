using System.Diagnostics.CodeAnalysis;

namespace WebAPI.Logging
{
    public class WebAPIFileLogger: ILogger
    {
        protected readonly WebAPIFileLoggerProvider _webAPIFileLoggerProvider;
        //Project parent directory path
        private string _projectParentDirectory = Directory.GetParent(Directory.GetParent(Directory.GetCurrentDirectory())!.ToString())!.ToString();
        public WebAPIFileLogger([NotNull] WebAPIFileLoggerProvider webAPIFileLoggerProvider) {
            _webAPIFileLoggerProvider = webAPIFileLoggerProvider;
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return null;
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return logLevel != LogLevel.None;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;
            //var fullFilePath = string.Format("{0}/{1}",_webAPIFileLoggerProvider.Options.FolderPath, _webAPIFileLoggerProvider.Options.FilePath.Replace("{date}",DateTime.UtcNow.ToString("yyyyMMdd")));
            var fullFilePath = string.Format("{0}/{1}", _webAPIFileLoggerProvider.Options.FolderPath!.Replace("{localPath}",_projectParentDirectory), _webAPIFileLoggerProvider.Options.FilePath);
            var logRecord = string.Format("{0} {1} {2} {3}", DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),logLevel.ToString(), formatter(state,exception),(exception!=null ? exception.StackTrace: ""));

            using (var streamWriter = new StreamWriter(fullFilePath, true))
            {
                streamWriter.WriteLine(logRecord);
            }
        }
    }
}
