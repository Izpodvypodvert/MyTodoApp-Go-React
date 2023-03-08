import {ActionIcon, Text} from "@mantine/core";
import {RepoDeletedIcon} from "@primer/octicons-react";



function GroupTitle({group, deleteGroup}: any) {
    return (
        <div style={{display: 'flex', textAlign: 'center'}}>
            <Text color="white"> {group.Title} </Text>
            <ActionIcon
                onClick={() => deleteGroup(group.ID)
                }
                color="green"
                size={24}
                radius="xl">
                <RepoDeletedIcon size={20}/>

            </ActionIcon>
        </div>
)
}

export default  GroupTitle