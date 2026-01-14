export default ({
    className="",
    children=[]
}) => {
    return Widget.Box({
        vertical: true,
        className,
        children
    })
}