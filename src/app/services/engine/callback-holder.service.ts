import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type CallbackParams = Array<any>
type CallbackFunction = (params: CallbackParams) => void
type CallbackFunctionWithParams = {
    callback: CallbackFunction,
    params: CallbackParams
}

@Injectable({
  providedIn: 'root'
})
export class CallbackHolderService {

  
  static instance: CallbackHolderService;
  static getInstance() {
    if (CallbackHolderService.instance) {
      return CallbackHolderService.instance;
    }

    CallbackHolderService.instance = new CallbackHolderService();
    return CallbackHolderService.instance;
  }

	_callbacks: Array<CallbackFunctionWithParams> = [];
	_start: number = Date.now();
	_time: BehaviorSubject<number> = new BehaviorSubject<number>(Date.now())
  set time(value: any) {
    this._time.next(value);
  }

  get time() {
    return this._time.getValue();
  }

  constructor() { 
    this.launch(250);
  }

  register(callback: CallbackFunction, params: CallbackParams):void {
		this._callbacks.push({callback: callback, params: params})
	}
  
	do(): void {
		for (let callback of this._callbacks) {
			callback.callback(callback.params)
		}
	}

  launch(delta:number):void {
		setInterval(() => {
			this.time = Date.now() - this._start;
			this.do()
		}, delta)
	}
}
