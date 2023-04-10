import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Console, count } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  logInUser(body: any){
    return this.http.post('/api/Login/', body);
  }

  createUser(body: any){
    return this.http.post('/api/User/', body);
  }

  getUserById(id: number){
    return this.http.get(`/api/User/${id}`);
  }

  getHotTake(){
    return this.http.get(`/api/HotTake/`);
  }

  postHotTake(body: any){
    return this.http.post(`/api/HotTake/`, body);
  }

  getHotTakeById(id: number){
    return this.http.get(`/api/HotTake/${id}`);
  }

  addReact(body: any){

    return this.http.post(`/api/React/`, body);
  }

  getReactionsOfLogedInUser(body: any){
    //const AgreeReactionNumber = await.getRequest().query(`SELECT COUNT(*) as agree_count FROM Reacts r JOIN react_types rt ON r.react_type_id = rt.id WHERE rt.type_name = 'AGREE' AND r.user_id = [user_id] AND r.hot_take_id = [hot_take_id];`)
    return this.http.post(`/api/ReactionsOfUser/`, body);
  }

  getReactionsOfHotTake(id: number){
    //const AgreeReactionNumber = await.getRequest().query(`SELECT COUNT(*) as agree_count FROM Reacts r JOIN react_types rt ON r.react_type_id = rt.id WHERE rt.type_name = 'AGREE' AND r.user_id = [user_id] AND r.hot_take_id = [hot_take_id];`)
    return this.http.get(`/api/ReactionsOfHotTake/${id}`);
  }

  deleteHotTake(idHotTake: number, idUser: number){
    return this.http.delete(`/api/HotTake/${idHotTake}/${idUser}`);
  }

  getQuests(){
    return this.http.get(`/api/Quest/`);
  }

  postQuest(body: any){
    return this.http.post(`/api/Quest/`, body);
  }

  deleteQuest(idQuest: number, idUser: number){
    return this.http.delete(`/api/Quest/${idQuest}/${idUser}`);
  }

  checkCompletedQuest(body: any){
    return this.http.post(`/api/CheckQuest/`, body);
  }

  completeQuest(body: any){
    return this.http.post(`/api/CompleteQuest/`, body);
  }

  checkQuestFinished(idQuest: number, idUser: number){

    return this.http.get(`/api/FinishedQuest/${idUser}/${idQuest}`);
  }

  getBadge(idUser: number){
    return this.http.get(`/api/Badge/${idUser}`);
  }

  getTop3(){
    return this.http.get(`/api/Top3/`);
  }

}
