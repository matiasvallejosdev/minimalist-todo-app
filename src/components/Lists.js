import ListElement from "@/src/components/Lists/ListElement";
import {getLists} from "@/src/services/Lists";
import {IconMenu2, IconCalendar, IconInbox} from '@tabler/icons-react';
import {getAccessTokenServer} from "@/src/services/AuthServer";


export default async function TasksList({req}) {
    const accessToken = await getAccessTokenServer();
    let lists = await getLists( accessToken);
    lists = lists.filter(e => e.name !== 'inbox');

    // TODO: Upcoming temporaliy disable until backend was updated
    return <>
        <ul className="flex flex-col gap-1.5">
            <ListElement key={'1-inbox'} id={'1-inbox'} name={'Inbox'} list_uuid='inbox' icon={<IconInbox size={17} />} deleteButton={false} 
                isSelected={true}
            />
            {/* <ListElement key={'2-upcoming'} id={'2-upcoming'} name={'Upcoming'} list_uuid='upcoming' icon={<IconCalendar size={17} />} deleteButton={false}
                isSelected={false}
            /> */}
            {
                lists.map((list) => {
                    const {id, name, list_uuid, created_by} = list;
                    return <ListElement key={id} id={id} name={name} list_uuid={list_uuid} icon={<IconMenu2 size={17}/>} deleteButton={true}
                        isSelected={false}
                    />
                })
            }
        </ul>
    </>
}