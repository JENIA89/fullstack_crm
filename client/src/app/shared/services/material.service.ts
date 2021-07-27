import { ElementRef } from "@angular/core"

declare var M

export class MaterialService {
    static toasts(message: string){
        M.toast({html: message})
    }

    static initFloatinButton(ref: ElementRef){
        M.FloatingActionButton.init(ref.nativeElement)
    }

    static updateTextInputs(){
        M.updateTextFields()
    }
}