import React, {createRef} from 'react';
import Style from "./SocialShare.module.css";
import SocialShareIcon from "@/Library/CustomIconLibrary/SocialShareIcon.jsx";
import Facebook from "@/Library/CustomIconLibrary/Facebook.jsx";
import Tiktok from "@/Library/CustomIconLibrary/Tiktok.jsx";
import Instragram from "@/Library/CustomIconLibrary/Instragram.jsx";
import Youtube from "@/Library/CustomIconLibrary/Youtube.jsx";
import Linkedin from "@/Library/CustomIconLibrary/linkedin.jsx";

function SocialShare(props) {
    const shareRef = createRef();
    const linkRaf = createRef();

    const handelView = () => {
        shareRef.current.classList.add("d-none")
        linkRaf.current.classList.remove("d-none")
    }

    return (
        <h4 className={Style.socialShare}>Share
            <span
                ref={shareRef}
                className={Style.socialShareIcon}
                onClick={handelView}
            >
            <SocialShareIcon
                width={18}
                height={20}
            />
        </span>

            <ul
                ref={linkRaf}
                className={`${Style.socialLinkWrapper} d-none`}
            >
                <li>
                    <a href="#">
                        <Facebook
                            width={28}
                            height={29}
                        />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Tiktok
                            width={28}
                            height={29}
                        />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Instragram
                            width={28}
                            height={29}
                        />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Youtube
                            width={28}
                            height={29}
                        />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <Linkedin
                            width={28}
                            height={29}
                        />
                    </a>
                </li>
            </ul>
        </h4>
    );
}

export default SocialShare;
