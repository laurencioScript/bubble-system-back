const a =  [{"truck":[{"packload":{"value":7,"n":7}}]},{
"truck":[{"packload":{"value":7,"n":6}}]},{
"truck":[{"packload":{"value":7,"n":6}}]},{
"truck":[{"packload":{"value":7,"n":6}}]},{
"truck":[{"packload":{"value":15,"n":15}}]}];

const b =  [{"truck":[{"packload":[{"value":6},{"n":6}]}]},{
    "truck":[{"packload":{"value":6,"n":6}}]},{
    "truck":[{"packload":{"value":6,"n":6}}]},{
    "truck":[{"packload":{"value":6},"n":6}]},{
    "truck":[{"packload":{"value":15,"n":15}}]}];

    a.find(caminhao => {
        caminhao.truck.find(packload=>{
            console.log(packload.packload.value )
            console.log(b[4])
             if(b[0].truck[0].packload[0].value === packload.packload.value){
                 console.log('SUCCESS',b[0].truck[0].packload[0].value,packload.packload.value)
             }
             else{
                console.log('ERROR',b[0].truck[0].packload[0].value,packload.packload.value)
             }
        })
    })