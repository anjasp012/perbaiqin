import Modal from '@/components/modal';
import { Select } from '@/components/select';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const reasons = ['This is a hate speech', 'Contains inappropriate content', 'This is a spam', 'This is a scam', 'This is a fake news'];
export default function ReportModal({ comment, show, onClose }) {
    const { data, setData, processing, post, errors } = useForm({
        reason: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('comments.reportSpam', [comment]), {
            preserveScroll: true,
            onSuccess: () => onClose(false),
        });
    }
    return (
        <Modal show={show} onClose={() => onClose(false)}>
            <div className="p-6">
                <h4 className="mb-4 text-lg font-semibold">Report Comment</h4>
                <form onSubmit={submit}>
                    <div className="mb-2">
                        <label htmlFor="reason" className="mb-2 block text-gray-500">
                            Select a reason for reporting this comment
                        </label>
                        <Select
                            placeholder="Select a reason"
                            onValueChange={(value) => setData('reason', value)}
                            name="reason"
                            id="reason"
                            options={reasons.map((reason, index) => ({
                                value: reason,
                                label: reason,
                            }))}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-x-1">
                        <Button variant="secondary" type="button" onClick={() => onClose(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Report</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
