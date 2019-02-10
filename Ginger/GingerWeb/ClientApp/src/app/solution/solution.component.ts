import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html'
})


export class SolutionComponent
{
  public solutions: Solution[];
  public report: string;
  mHttp: HttpClient;
  mBaseUrl: string;

  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.mHttp = http;
    this.mBaseUrl = baseUrl;

    http.get<Solution[]>(baseUrl + 'api/Solution/Solutions').subscribe(result => {
      this.solutions = result;
    }, error => console.error(error));

  }

  public openSolutionFlow(BF:Solution) {
    
    const req = this.mHttp.post<RunBusinessFlowResult>(this.mBaseUrl + 'api/BusinessFlow/RunBusinessFlow', {
      name: BF.name  //TODO: We send the BF name replace with BF.Guid
    })
      .subscribe(
      res => {
        // Once we get the response        
        //BF.status = res.status;
        //BF.elapsed = res.elapsed;
        // this.report = res.report;
      },
        err => {
          console.log("Error occured");
          //BF.status = "Error 123";
        }
      );
  }

  

}



interface RunBusinessFlowResult {
  status: string;
  elapsed: number;
  report: string;
}

interface Solution {
  name: string;
  folder: string;  
}
