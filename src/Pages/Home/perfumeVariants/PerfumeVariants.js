import React from 'react';
import Fade from 'react-reveal/Fade';
import header1 from '../../../Images/imagecompressor/Optimized-header1.jpg'
import header2 from '../../../Images/imagecompressor/Optimized-roses-background.jpg'
import header3 from '../../../Images/imagecompressor/lavender-purple-decoration-flower-blossom-min.jpg'
import header4 from '../../../Images/imagecompressor/bouquet-flowers-background-min.jpg'
import header5 from '../../../Images/imagecompressor/beautiful-bouquet-flower-background-min.jpg'

const PerfumeVariants = () => {
    return (
        <div className="row my-5">
            <div className="col-lg-6">
                <Fade left>
                    <img className="img-fluid" src={header1} alt="" />
                </Fade>
            </div>
            <div className="col-lg-6">
                <div className="col-lg-12">
                    <Fade right>
                        <img className="img-fluid w-50" src={header2} alt="" />
                        <img className="img-fluid w-50" src={header3} alt="" />
                    </Fade>
                </div>
                <div className="col-lg-12">
                    <Fade right>
                        <img className="img-fluid w-50" src={header4} alt="" />
                        <img className="img-fluid w-50" src={header5} alt="" />
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default PerfumeVariants;