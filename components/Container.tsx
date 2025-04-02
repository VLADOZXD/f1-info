const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary lg:p-7 md:p-4 p-3 md:mb-10 mb-6 border-white border-t-[6px] border-l-[6px] border-opacity-5 rounded-tl-[36px] drop-shadow-lg">
      {children}
    </div>
  )
}

export default Container
