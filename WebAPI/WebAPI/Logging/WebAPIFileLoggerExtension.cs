namespace WebAPI.Logging
{
    public static class WebAPIFileLoggerExtension
    {

        public static ILoggingBuilder AddWebAPIFileLogger(this ILoggingBuilder builder, Action<WebAPIFileLoggerOptions> configure) {
            builder.Services.AddSingleton<ILoggerProvider,WebAPIFileLoggerProvider>();
            builder.Services.Configure(configure);
            return builder;
        }
    }
}
