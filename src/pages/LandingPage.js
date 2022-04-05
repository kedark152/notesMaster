import "../styles/pages/landingpage.css"
import "../styles/utils/variable.css"

export const LandingPage = () =>{

    return (
    <>
    <div className="container-landing-pg flex">
        <div className="text-content">
            <h1 className="brand-name fw-bold mg-sm"><span className="primary-color">Notes</span><span className="secondary-color">Master</span><img className="notes-icon" src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1649178068/notes_heyg7e.png"/></h1>
            <h2 className="brand-slogan  mg-y-xlg mg-x-sm primary-color">Write, Organize, Save and Access your Notes anywhere and at anytime</h2>
            <p className="brand-description  mg-x-sm fw-bold secondary-color">Create and Save your Notes, Tasks, Ideas, Important Info, Links before missing out. Systematically Organize them to quickly access it.</p>
            <div className="align-center pd-sm">
                <a href="#" className="btn btn-solid fw-bold">Sign up</a>
                <a href="#" className="primary-color fw-bold">Already Have an Account?</a>
            </div>
        </div>
      <img className="hero-image" src="https://res.cloudinary.com/dvuh4fz9d/image/upload/v1649170922/undraw_thought_process_re_om58_1_nwgyfi.svg"/>
    </div>
    
    
    </>)
}
