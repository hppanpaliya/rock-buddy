import Button from 'react-bootstrap/Button';
import React, {useState, useEffect} from 'react';


 const Pagnation = (props) =>{


     const disable = (event) => {
        event.currentTarget.disabled = true;
        console.log('disabled')
      };

      const increasePage = (event) =>{
        props.setPage(props.page+1);
        event.currentTarget.disabled = false;
      };

      const decreasePage = (event) =>{
        props.setPage(props.page-1);
        event.currentTarget.disabled = false;
      };


    if(props.next && props.prev){
        return(
            <div>
            <Button onClick={(event)=>{
                 disable(event);
                 decreasePage(event);
            }}>
            Previous
            </Button>
            <Button onClick={(event)=>{
                disable(event);
                increasePage(event);
            }}>
                Next
            </Button>
            </div>
            )
        }

    else if(props.next && props.prev == null){
        return(
            <Button onClick={(event)=>{
                disable(event);
                increasePage(event);
            }
            }>
            Next
            </Button>
            )
        }

    else if(props.next == null && props.prev){
        return(
            <Button onClick={(event)=>{
                disable(event);
                decreasePage(event);
           }}>
           Previous
           </Button>
            )
        }
    else{
        return
    }
};

export default Pagnation;