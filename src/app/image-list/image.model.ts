export class ImageList{
    constructor(
    public id: number,
    public imageName: string,
    public imageUrl: string,
    public imageText: string,
    ){}
}

export interface responseType{
    status: string,
    image_url : string,
    message: string
}