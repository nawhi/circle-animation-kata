import { Fragment } from 'react';
import { actions, selectors, useAppDispatch, useAppSelector } from '../store/store';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { chooseNextEntityNumber } from '../store/id';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '../lib/utils';
import { KeyframeThumbnail } from './keyframe-thumbnail';

function Storyboard() {
  const keyframes = useAppSelector(selectors.keyframes.selectAll);
  const selectedKeyframeId = useAppSelector((state) => state.app.selectedKeyframeId);
  const dispatch = useAppDispatch();

  return (
    <div className="flex overflow-x-auto py-4 px-6 border-b bg-zinc-100/40 dark:bg-zinc-800/40 min-h-[80px]">
      <RadioGroup className="flex items-center gap-8">
        {keyframes.map((kf) => (
          <Fragment key={kf.id}>
            <RadioGroupItem value={kf.id} className="sr-only" />
            <Button
              variant="outline"
              className={cn(
                'w-[80px] h-[80px] border-2 rounded-md flex align-center justify-center',
                kf.id === selectedKeyframeId ? 'border-primary' : 'border-muted'
              )}
              onClick={() => dispatch(actions.app.selectKeyframe(kf.id))}
            >
              <KeyframeThumbnail id={kf.id} />
            </Button>
          </Fragment>
        ))}
        <Button
          variant="outline"
          className="border-dashed w-[80px] h-[80px]"
          onClick={() => {
            const id = chooseNextEntityNumber(keyframes, 'keyframe');
            const maxTime = Math.max(...keyframes.map((kf) => kf.time));
            const time = isFinite(maxTime) ? maxTime + 1 : 0;
            return dispatch(
              actions.keyframes.addOne({
                id: `keyframe${id}`,
                entries: [],
                time,
              })
            );
          }}
        >
          <Plus />
          Add
        </Button>
      </RadioGroup>
    </div>
  );
}

export default Storyboard;
