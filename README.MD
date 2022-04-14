======================================

Dependencies needed BEFORE setup

======================================

*** NOTE: If any installs fail, try to run as administrator, this usually fixes a failed install
</br > </br > 

Node JS 16.14.2 LTS (installed additional tools during installation process) </br > 
Link to download: https://nodejs.org/en/download/
</br > </br > 

Angular 12 (specifically 12.2.16) </br > 
Install with `npm install -g @angular/cli@12.2.16`
</br > </br >

Python 3.10.0 </br > 
Link to download: https://www.python.org/downloads/release/python-3100/
</br > </br >

Open CV </br > 
Install with `pip install opencv-python`
</br > </br >

Google Cloud Vision </br > 
Install with `pip install google-cloud-vision`
</br > </br >

Pillow </br > 
Install with `pip install pillow`
</br > </br >

Visual Studio Community 2022 and VS Code (latest version) </br > 
** Used .NET install in Visual Studios Community 2022</br > 
Link to download Visual Studio Community 2022: https://visualstudio.microsoft.com/vs/ (Make sure you choose Community version)</br > 
Link to download Visual Studio Code: https://code.visualstudio.com/
</br > </br >

If you chose not to or for some reason .NET 6 was not installed during the Visual Studio Community installation, you can download that here: </br > 
https://dotnet.microsoft.com/en-us/download (Specifically .NET 6)
</br > </br >

========================

Setup

========================


1) Clone project

2) Navigate to Urban-Science-Code-Builder\WebApp in the terminal
3) Type `npm install` in this directory
4) Run `ng serve --open` to ensure the frontend is working properly

5) Navigate to Urban-Science-Code-Builder\WebAPI\Code-Generation-API in the terminal
6) Type `npm install` in this directory
7) Type `npm install --save schematics-code-builder-1.0.1.tgz`

8) Open "WebAPI.sln" in Urban-Science-Code-Builder\WebAPI using Visual Studios
9) Will be asked about SSL, click Yes



======================

Running the project

======================

1) Open "WebAPI.sln" in Urban-Science-Code-Builder\WebAPI using Visual Studios and click run
2) Navigate to Urban-Science-Code-Builder\WebApp in the terminal
3) Type `ng serve --open`
4) Project should now be running
