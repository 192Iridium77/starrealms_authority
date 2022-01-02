export default function Modal({ children }) {
  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="bg-tertiary-300">
          <div
            className="px-8"
            style={{
              overflowY: "auto",
              minWidth: "600px",
              maxHeight: "50vh",
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
