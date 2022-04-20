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

Image Detection </br > 
Install with `pip install tensorflow`</br > 
Install with `pip install keras`</br > 
Install with `pip install matplotlib`</br > 
Install with `pip install imutils`
</br > </br >

Pillow </br > 
Install with `pip install pillow`
</br > </br >

Visual Studio Community 2022 (VS) and VS Code (VS Code). VS was used for the .NET back end and VS Code was used for the Anuglar front end portion.</br > 
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

5) Navigate to Urban-Science-Code-Builder\WebAPI\Code-Generation-API\Generation_Environment in the terminal
6) Type `npm install` in this directory
7) In the same directory as step 6, type `npm install --save ..\code-builder_schematic\packed_files\schematics-code-builder-1.1.1.tgz` (See note below)

8) Open "WebAPI.sln" in Urban-Science-Code-Builder\WebAPI using Visual Studio
9) Will be asked about SSL, click Yes

</br >

Step 7 Note: 
  * schematics-code-builder-1.1.1.tgz is the latest version, if there happens to be a version higher use that one instead
  * This module should already be installed, but step 7 is to ensure it is installed correctly

======================

Running the project

======================

1) Open "WebAPI.sln" in Urban-Science-Code-Builder\WebAPI using Visual Studio and click run
2) Navigate to Urban-Science-Code-Builder\WebApp in the terminal
3) Type `ng serve --open --ssl`. Using the --ssl flag with enable HTTPS.
4) Project should now be running

======================

Troubleshooting

======================

* Exceptions that occur during the WebAPI's runtime are logged in the "error_log.log" file in the "WebAPI\Logging\Logs" folder.
