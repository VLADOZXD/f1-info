const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background lg:p-7 p-4 border-white border-t-[6px] border-l-[6px] border-opacity-5 rounded-tl-[36px] drop-shadow-lg">
      {children}
    </div>
  )
}

export default Container
