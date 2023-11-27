export default function MenuButton({setIsHidden, isHidden}) {
    const style = {
      position: "absolute",
      fontFamily: "Adina, Fallback, sans-serif",
      fontSize: "1.9em",
      height: "1.7em",
      width: "8em",
      color: "white",
      border: "0.1em solid white",
      backgroundColor: "transparent",
      borderRadius: "1em",
      padding: "0.35em 0.6em",
      alignContent: "center",
      lineHeight: "1",
      zIndex: "1",
    };
  
    return (
      <div className="bg-black h-28">
        <button
          style={style}
          className="left-3 top-5 sm:left-10 sm:top-10 hover:scale-105 active:brightness-75 shadow-lg text "
          type="secondary-hero"
          onClick={() => setIsHidden(!isHidden)}>
          = MENU 
        </button>
      </div>
    );
  }