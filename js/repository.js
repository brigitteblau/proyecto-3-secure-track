
export async function register_user (user){
   
    console.log(user);

   try {
    let response = await fetch(`https://secure-track-db.vercel.app/users/register`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user),
        
    });
    let data = await response.json();
    console.log(data);
   } catch (error) {
    console.log(error)
   }
}
