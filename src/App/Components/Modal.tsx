export const Modal: React.FC<{ children: any }> = ({
    children
}) => (
    <>
        <div className="fixed z-40 top-0 left-0 h-full w-full bg-black opacity-50" />
        <div className="fixed z-50 bg-gray-700 p-3 rounded shadow w-full sm:max-w-md sm:w-4/6 min-h-96 left-0 right-0 top-20 mx-auto">
            {children}
        </div>
    </>
)