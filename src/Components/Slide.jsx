const Slide = () => {
   return (
      <div
         className="hero min-h-[calc(100vh-68px)]"
         style={{
            backgroundImage:
               "url(https://images.pexels.com/photos/9947261/pexels-photo-9947261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
         }}
      >
         <div className="hero-overlay bg-opacity-60"></div>
         <div className="hero-content text-center ">
            <div className="max-w-3xl">
               <h6>Lend a Helping Hand</h6>
               <h1 className="mb-5 text-5xl font-bold">
                  This world needs heroes like you and me.
               </h1>
               <p className="mb-5">
                  Let us not waste food anymore. There is plenty to share for
                  others.
               </p>
               <button className="btn btn-primary">All Foods</button>
            </div>
         </div>
      </div>
   );
};

export default Slide;
