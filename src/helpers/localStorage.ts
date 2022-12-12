import { IPlayer } from "./interfaces"

export const localGet = (item: string, setter: (data: IPlayer | IPlayer[]) => void) => {
    const data = localStorage.getItem(item)
    console.log(data)
    if (data) {
      setter(JSON.parse(data))
    }
}

export const localSet = (item: string, object: IPlayer | IPlayer[] ) => {
    localStorage.setItem(item, JSON.stringify(object))
}
    
    


  
  