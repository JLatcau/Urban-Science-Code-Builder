using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Preventing multipart file error
builder.Services.Configure<FormOptions>(o => {
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
}
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{ 
    FileProvider=new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),@"Resources")),
    RequestPath= new PathString("/Resources")
}
    );
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors(options => options.AllowAnyOrigin());

app.Run();
