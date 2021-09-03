import { useState } from 'react';

const styles = {
    imgBox: {
        width: "22px",
        height: "22px",
        padding: "2px",
        // boxSizing: "border-box",
        background: "#808080",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "auto"
    }
}

export default (props) => {
    const { src, style = styles.imgBox, className, ...rest } = props;

    let [imageStyle, setImageStyle] = useState(styles.image);

    const finish = (e) => {
        let { clientHeight, clientWidth } = e.target;
        if (clientHeight > clientWidth) {
            setImageStyle({
                width: "auto",
                height: "100%"
            });
        } else {
            setImageStyle(styles.image);
        }
    }

    return <div {...{ style, className }} {...rest}>
        {src && <img key={src} style={imageStyle} src={src} alt="" onLoad={finish} />}
    </div>
}