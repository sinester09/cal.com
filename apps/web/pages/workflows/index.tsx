import { DotsHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Link from "next/link";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button } from "@calcom/ui";
import Dropdown, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@calcom/ui/Dropdown";

import { withQuery } from "@lib/QueryCell";
import { inferQueryOutput } from "@lib/trpc";

import Shell from "@components/Shell";
import SkeletonLoader from "@components/availability/SkeletonLoader";
import { NewWorkflowButton } from "@components/workflows/NewWorkflowButton";

const WithQuery = withQuery(["viewer.workflows.list"]);

export default function Workflows() {
  const { t } = useLocale();

  return (
    <div>
      <Shell
        heading={t("workflows")}
        subtitle={t("workflows_to_automate_notifications")}
        CTA={<NewWorkflowButton />}
        customLoader={<SkeletonLoader />}>
        <WithQuery success={({ data }) => <WorkflowList {...data} />} customLoader={<SkeletonLoader />} />
      </Shell>
    </div>
  );
}

export const WorkflowList = ({ workflows }: inferQueryOutput<"viewer.workflows.list">): JSX.Element => {
  const { t } = useLocale();

  return (
    <div className="-mx-4 mb-16 overflow-hidden rounded-sm border border-gray-200 bg-white sm:mx-0">
      <ul className="divide-y divide-neutral-200">
        {workflows.map((workflow) => (
          <li key={workflow.id}>
            <div className="first-line:group flex w-full items-center justify-between px-4 py-4 hover:bg-neutral-50 sm:px-6">
              <div className="rtl:space-x-reverse">
                <div className="max-w-56 truncate text-sm font-medium leading-6 text-neutral-900 md:max-w-max">
                  {workflow.name}
                </div>
                <div className="max-w-52 md:max-w-96 truncate text-sm text-gray-500">
                  {t("triggers")} {t(`${workflow.trigger.toLowerCase()}_trigger`)}
                </div>
              </div>
              <div className="mt-4 hidden flex-shrink-0 sm:mt-0 sm:ml-5 sm:flex">
                <div className="flex justify-between space-x-2 rtl:space-x-reverse">
                  <Dropdown>
                    <DropdownMenuTrigger className="h-10 w-10 cursor-pointer rounded-sm border border-transparent text-neutral-500 hover:border-gray-300 hover:text-neutral-900 focus:border-gray-300">
                      <DotsHorizontalIcon className="h-5 w-5 group-hover:text-gray-800" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link href={"/workflows/" + workflow.id} passHref={true}>
                          <Button
                            type="button"
                            size="sm"
                            color="minimal"
                            className="w-full rounded-none"
                            StartIcon={PencilIcon}>
                            {t("edit")}
                          </Button>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => {
                            console.log("delete");
                          }}
                          color="warn"
                          size="sm"
                          StartIcon={TrashIcon}
                          className="w-full rounded-none">
                          {t("delete")}
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </Dropdown>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};