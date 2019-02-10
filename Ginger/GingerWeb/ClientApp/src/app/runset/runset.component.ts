import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'runset',
  templateUrl: './runset.component.html'
})


export class RunSetComponent
{
  public runsets: RunSet[];
  public report: string;
  mHttp: HttpClient;
  mBaseUrl: string;

  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.mHttp = http;
    this.mBaseUrl = baseUrl;

    http.get<RunSet[]>(baseUrl + 'api/RunSet/RunSets').subscribe(result => {
      this.runsets = result;
    }, error => console.error(error));

  }

  public run(BF:RunSet) {

    BF.status = "Running";
    BF.elapsed = -1;
    const req = this.mHttp.post<RunBusinessFlowResult>(this.mBaseUrl + 'api/RunSet/RunRunSet', {
      name: BF.name  //TODO: We send the BF name replace with BF.Guid
    })
      .subscribe(
      res => {
        // Once we get the response        
        BF.status = res.status;
        BF.elapsed = res.elapsed;
        // this.report = res.report;
      },
        err => {
          console.log("Error occured");
          BF.status = "Error !!!";
        }
      );
  }

  public flowReport(BF: RunSet) {
    
  }



}



interface RunBusinessFlowResult {
  status: string;
  elapsed: number;
  report: string;
}

interface RunSet {
  name: string;
  description: string;
  fileName: string;
  status: string;
  elapsed: number;  
}
