export class Quote {
    constructor(public dateQuote:Date, public numOffre:string, public name:string, public mail:string, 
                public addressFrom:string,public addressTo:string, public distance:number, 
                public surface:number, public atticCellar:number, public piano:boolean, 
                public packHelpful:boolean, public priceDistance:number, public totalSurface:number, 
                public nbCar:number, public totalPrice:number) {
    }
}