export interface Task {
    id:number;
    todo:string;
    completed:boolean;
    isLocal?:boolean;
}