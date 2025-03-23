import DarkSmall from "../../../img/logo/dark/dark-small.svg";
import DarkSmallUni from "../../../img/logo/dark/dark-small-unicolor.svg";
import DarkLarge from "../../../img/logo/dark/dark-large.svg";
import DarkLargeUni from "../../../img/logo/dark/dark-large-unicolor.svg";
import LightSmall from "../../../img/logo/light/small.svg";
import LightSmallUni from "../../../img/logo/light/small-unicolor.svg";
import LightLarge from "../../../img/logo/light/large.svg";
import LightLargeUni from "../../../img/logo/light/large-unicolor.svg";


export default function Logo({ size, mode, uni, ...props }) {

    size = size ?? 'small'
    mode = mode ?? 'light'

    const logoVariants = {
        'light,small': <img src={LightSmall} {...props} />,
        'light,large': <img src={LightLarge} {...props} />,
        'dark,small': <img src={DarkSmall} {...props} />,
        'dark,large': <img src={DarkLarge} {...props} />
    };

    const uniLogoVariants = {
        'light,small': <img src={LightSmallUni} {...props} />,
        'light,large': <img src={LightLargeUni} {...props} />,
        'dark,small': <img src={DarkSmallUni} {...props} />,
        'dark,large': <img src={DarkLargeUni} {...props} />
    };

    if(uni) return uniLogoVariants[`${mode},${size}`]
    return logoVariants[`${mode},${size}`]
}