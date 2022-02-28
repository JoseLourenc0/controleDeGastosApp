export interface Category {
    title           : string
    type            : string
    visible         ?: boolean
    dateCreation    ?: string
}

export interface Finance {
    category        :string 
    type            :string
    value           :number
    dateCreation    ?:string 
}