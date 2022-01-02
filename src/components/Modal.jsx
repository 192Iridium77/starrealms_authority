export default function Modal({ children }) {
  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="bg-tertiary-300">
          <div
            className="px-8 lg:max-h-50vh lg:min-w-600px"
            style={{
              overflowY: "auto",
              paddingTop: "1px",
              paddingBottom: "1px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>
    </>
  );
}
