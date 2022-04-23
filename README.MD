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
1) Install with `pip install tensorflow`</br > 
2) Install with `pip install keras`</br > 
3) Install with `pip install matplotlib`</br > 
4) Install with `pip install imutils`</br > 
5) Install with `pip install pandas`</br > 
6) Install with `pip install numpy`</br > 
7) Install with `pip install -U scikit-learn` </br>
8) Download the data folder from 'https://drive.google.com/file/d/1fYbCPbc8EyEOERceZ_bDcN-1pxd69UtX/view?usp=sharing'</br > 
9) Extract the data folder into /Urban-Science-Code-Builder/WebAPI/Image_Recognition_API/</br > 
10) Navigate to /Urban-Science-Code-Builder/WebAPI/Image_Recognition_API/ in the terminal</br > 
11) Build the model by typing `python tf.py` in this directory</br > 
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

======================

Deployment

======================

Both the Web App and Web API are currently configured to run on localhost. The Web API's "applicationURL" is set to https://localhost:7112/;http://localhost:5112 in the "WebPI\Properties\launchSettings.json" file, which is also specified in the corresponding "app\_service\file.service.ts" file of the Web App for server requests and API calls.
