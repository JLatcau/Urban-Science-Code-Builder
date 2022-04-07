======================================

Dependencies needed BEFORE setup

======================================

*** NOTE: If any installs fail, try to run as administrator, this usually fixes a failed install

Node JS 16.14.2 LTS (installed addition tools, unsure if that was necessary)

Angular 12 (specifically 12.2.16)
Install with `npm install -g @angular/cli@12`

** I used Visual Studio Community 2022 and VS Code (latest version)
** Used .NET install is Visual Studios Community 2022

Python310

Open CV
`pip install opencv-python`

Google Cloud Vision
`pip install google-cloud-vision`

Pillow
`pip install pillow`

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
3) Type 'ng serve --open`
4) Project should now be running



NOTE: ** means dev tool, not needed, or can be of a different version
