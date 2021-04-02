interface NothingPlayerProps { }
export const NothingPlayer: React.FC<NothingPlayerProps> = () => (
    <div className="bg-gray-800 text-center flex flex-col justify-center">
        <span className="block text-center font-semibold text-3xl">Nothing is playing</span>
        <p className="mt-3 opacity-70">Jump and and start this party!</p>
    </div>
);