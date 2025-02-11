import Profile from "../components/Profile";
import PhotoGrid from "../components/PhotoGrid";

export default function Home() {
    return (
        <div className="max-w-[602px] mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Gavin's photos</h1>
            <Profile profileImage="https://picsum.photos/100" username="#GavinXu" postCount={10690626}/>
            <h3 className="text-gray-600 text-sm font-medium ml-2 mb-4">Top posts</h3>
            <PhotoGrid/>
        </div>
    );
}
