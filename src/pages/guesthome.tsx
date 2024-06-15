
import TopAlbums from '@/components/ui/topalbums.tsx';
import Navbar from '@/components/ui/navbar.tsx';

 export const GuestHome = () =>  {


     
    return (
         <div className="mt-8">
            <Navbar/>
            <h1 className="scroll-m-20 text-4xl mt-3 mb-3 font-extrabold tracking-tight lg:text-5xl">
                    Welcome Guest!
            </h1>
            <TopAlbums />
         </div>
    )

}
export default GuestHome;