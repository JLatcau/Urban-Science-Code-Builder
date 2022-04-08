import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

    navigateToPage(route: string){
      console.log("route: "+route);
      this.router.navigate(['/', route]);
      // const a = document.createElement('a');
      //     a.setAttribute('routerLink', route);
      //     document.body.appendChild(a);
      //     a.target = '_blank';

      //     a.click();
          //document.body.removeChild(a);
      // document.getElementById("navigation")?.setAttribute("routerLink",route); 
      // document.getElementById("navigation")?.setAttribute("target","_self");
      // document.getElementById("navigation")?.click();
  }
}
