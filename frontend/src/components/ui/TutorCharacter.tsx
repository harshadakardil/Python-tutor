import { Card } from '@/components/ui/card'

interface TutorCharacterProps {
  character: 'friendly_teacher' | 'robot' | 'wizard'
  name: string
  description: string
  onSelect: (character: string) => void
  isSelected: boolean
}

const characterImages: Record<TutorCharacterProps['character'], string> = {
  friendly_teacher: '/assets/images/characters/friendly-teacher.svg',
  robot: '/assets/images/characters/robot-tutor.svg',
  wizard: '/assets/images/characters/wizard-mentor.svg'
}

export const TutorCharacter = ({
  character,
  name,
  description,
  onSelect,
  isSelected
}: TutorCharacterProps) => {
  return (
    <div 
      onClick={() => onSelect(character)}
      className="cursor-pointer"
    >
      <Card
        className={`relative p-6 transition-all ${
          isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <div className="w-24 h-24 mx-auto">
            <img
              src={characterImages[character]}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TutorCharacter;