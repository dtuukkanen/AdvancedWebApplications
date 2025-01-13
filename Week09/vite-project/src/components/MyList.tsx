import { ListProps } from '../types';


const MyList: React.FC<ListProps> = (props) => {
    return (
        <div>
            <h2>{props.header}</h2>
            <ol>
                {props.items.map((item) => (
                    <li 
                        key={item.id}
                        onClick={() => props.updateList(item.id)}
                        style={{ textDecoration: item.clicked ? 'line-through' : '' }}
                    >
                        {item.text}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default MyList;