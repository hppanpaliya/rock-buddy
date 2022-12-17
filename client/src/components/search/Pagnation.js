import Button from 'react-bootstrap/Button';

 const Pagnation = (props) =>{
    if(props.next && props.prev){
        return(
            <div>
            <Button onClick={()=> 
                props.setPage(props.page-1) }>
                Previous
            </Button>
            <Button onClick={()=> 
                props.setPage(props.page+1)}>
            Next
            </Button>
            </div>
            )
        }

    else if(props.next && props.prev == null){
        return(
            <Button onClick={()=> 
                props.setPage(props.page+1) }>
            Next
            </Button>
            )
        }

    else if(props.next == null && props.prev){
        return(
            <Button onClick={()=> 
                props.setPage(props.page-1)}>
                Previous
            </Button>
            )
        }
    else{
        return
    }
};

export default Pagnation;