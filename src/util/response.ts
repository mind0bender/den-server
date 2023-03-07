interface MyResponse<DataType>{
    data?:DataType,
    err?:any,
    status:boolean,
    msg:string
}

const createResponse:<DataType>({ msg, err, status, data }: MyResponse<DataType>) => MyResponse<DataType> = <DataType,>({msg, err, status, data}:MyResponse<DataType>):MyResponse<DataType>=>{
    const response:MyResponse<DataType> = {
        status, msg
    }

    if(data){
        response.data=data;
    }
    if(err){
        response.err=err;
    }

    return response;
}

export default createResponse;