import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project:any;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string|any;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
 
  ) { 
    this.title = "Editar-proyecto";
    this.project = new Project('','','','', 2023,'','');
    this.status = " ";
    this.filesToUpload = [];
    this.url = Global.url;
  
  }

  ngOnInit(): void {
    this._route.params.subscribe((params:any)=>{
        let id = params['id'];

        this.getProject(id);
    });
  }

  getProject(id:any){
    this._projectService.getProject(id).subscribe(
        (response:any) =>{
          this.project = response.project;

        },
        (error:any) =>{
          console.log(<any>error);
        }
    )

  }

  onSubmit(projectForm:any){
    this._projectService.updateProject(this.project).subscribe(
      (response:any) =>{
        if(response.project){
					
					// Subir la imagen

          if(this.filesToUpload.length >=1){

            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload,'image')
            .then((result:any)=>{
  
              this.save_project = result.project;
              this.status = 'success';
              console.log(result);
            
  
            });
          }else{
            this.save_project = response.project;
            this.status = 'success';
          }			
		        
				}else{
					this.status = 'failed';
				}

      },
      (error:any) =>{
        console.log(<any>error);
      }

    )
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
