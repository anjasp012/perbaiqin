import clsx from 'clsx';
import { useForm } from '@inertiajs/react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function CommentForm(props) {
    const { data, post, setData, reset, processing, errors } = useForm({
        body: props.attributes.body ?? '',
        _method: props.attributes.method,
    });

    function submit(e) {
        e.preventDefault();
        post(props.attributes.url, {
            onSuccess: () => {
                reset();
                props.close();
            },
            preserveScroll: true,
        });
    }
    return (
        <Sheet open={props.open} onOpenChange={() => props.close()}>
            <SheetContent side="bottom" className="mx-auto -mb-px max-w-2xl overflow-hidden rounded-t-xl border p-0">
                <div>
                    <div className="flex items-center justify-between border-b bg-background px-4 py-2 sm:py-2.5">
                        <div className="flex items-center gap-x-2">
                            <div className="shrink-0">
                                <img width="24" height="24" className="h-6 w-6 rounded-full" src={props.auth.user.gravatar} alt="" />
                            </div>
                            <div>
                                <h4 className="font-medium">{props.auth.user.name}</h4>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="px-4 py-2 sm:py-2.5">
                            <textarea
                                autoFocus
                                placeholder="Enter your commment here..."
                                className="sm:text-tiny w-full resize-none border-0 bg-transparent p-0 text-sm placeholder-muted-foreground focus:border-0 focus:outline-none focus:ring-0"
                                name="body"
                                rows="6"
                                value={data.body}
                                onChange={(event) => setData('body', event.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between border-t px-4 py-2 text-muted-foreground">
                            <span className="flex items-center text-xs">Basic formatting & Markdown support</span>
                            {errors && <div className="text-sm text-rose-500">{errors.body}</div>}
                            <Button
                                disabled={data.body === '' ? true : props.processing}
                                type="submit"
                                className={clsx(processing || (data.body === '' && 'opacity-50'))}
                            >
                                {props.attributes.submitText}
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
