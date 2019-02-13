import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'runset',
  templateUrl: './runset.component.html'
})


export class RunSetComponent
{
  public runsets: RunSet[];  
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

  public run(runset:RunSet) {

    runset.status = "Running";
    runset.elapsed = -1;
    const req = this.mHttp.post<RunSetResult>(this.mBaseUrl + 'api/RunSet/RunRunSet', {
      name: runset.name  //TODO: We send the runset name replace with runset.Guid
    })
      .subscribe(
      res => {
        // Once we get the response        
        runset.status = res.status;
        runset.elapsed = res.elapsed;
        // this.report = res.report;
      },
        err => {
          console.log("Error occured");
          runset.status = "Error !!!";
        }
      );
  }



}



interface RunSetResult {
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
