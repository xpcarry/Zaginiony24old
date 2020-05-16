import {observable, computed, action, runInAction, values} from 'mobx';
import {IUser, IUserFormValues} from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../index'


export default class UserStore{
    rootStore: RootStore;
    constructor(rootStore:RootStore){
        this.rootStore = rootStore
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
      }

    @action login = async (values: IUserFormValues) => {
        try {
          const user = await agent.User.login(values);
          runInAction(() => {
            this.user = user;
          });
          console.log(user);
          this.rootStore.commonStore.setToken(user.accessToken);
          this.rootStore.modalStore.closeModal();
          history.push('/');
        } catch (error) {
          throw error;
        }
      };
      
    @action register = async (values:IUserFormValues) => {
      try{
        const user = await agent.User.register(values);
        runInAction(() => {
        });
      } catch (error) {
        throw error;
      }
    }

    @action getUser = async () => {
        try {
          const user = await agent.User.current();
          runInAction(() => {
            this.user = user;
            console.log('user fron ria getuser');
            console.log(this.user);
            console.log(user);
          });
        } catch (error) {
          console.log(error);
        }
      };
    
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
      };

}